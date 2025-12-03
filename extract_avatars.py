import cv2
import numpy as np
import os

def extract_avatars(image_path, output_dir):
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not load image from {image_path}")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Blur to reduce noise
    gray_blurred = cv2.medianBlur(gray, 5)

    # Detect circles using HoughCircles
    # Parameters might need tuning
    circles = cv2.HoughCircles(
        gray_blurred, 
        cv2.HOUGH_GRADIENT, 
        dp=1, 
        minDist=100,  # Minimum distance between centers
        param1=50,    # Upper threshold for Canny edge detector
        param2=30,    # Threshold for center detection (lower = more circles)
        minRadius=50, 
        maxRadius=200
    )

    if circles is not None:
        circles = np.round(circles[0, :]).astype("int")
        print(f"Found {len(circles)} circles.")

        # Sort circles: Top-to-bottom, then Left-to-right
        # We allow some slack in Y to group them into rows
        # Sort by Y first
        circles = sorted(circles, key=lambda x: x[1])
        
        # Group by rows (simple clustering)
        rows = []
        if circles:
            current_row = [circles[0]]
            for i in range(1, len(circles)):
                if abs(circles[i][1] - current_row[0][1]) < 50: # 50px tolerance for same row
                    current_row.append(circles[i])
                else:
                    rows.append(sorted(current_row, key=lambda x: x[0])) # Sort row by X
                    current_row = [circles[i]]
            rows.append(sorted(current_row, key=lambda x: x[0]))
        
        # Flatten list
        sorted_circles = [c for row in rows for c in row]

        # Role names in order
        role_names = ["max", "toni", "ahmed", "maria", "marcela"]

        for i, (x, y, r) in enumerate(sorted_circles):
            if i >= len(role_names):
                break
            
            # Crop
            # Add a small margin? No, exact circle.
            # Create mask
            mask = np.zeros((2*r, 2*r), dtype=np.uint8)
            cv2.circle(mask, (r, r), r, (255), -1)

            # Extract ROI
            y1, y2 = max(0, y-r), min(img.shape[0], y+r)
            x1, x2 = max(0, x-r), min(img.shape[1], x+r)
            
            roi = img[y1:y2, x1:x2]
            
            # If ROI is smaller than expected (edge case), resize mask or skip
            if roi.shape[0] != 2*r or roi.shape[1] != 2*r:
                print(f"Skipping circle {i} due to boundary clipping.")
                continue

            # Create RGBA image
            b, g, r_channel = cv2.split(roi)
            rgba = cv2.merge([b, g, r_channel, mask])

            # Save
            filename = f"avatar_{role_names[i]}.png"
            output_path = os.path.join(output_dir, filename)
            cv2.imwrite(output_path, rgba)
            print(f"Saved {output_path}")

    else:
        print("No circles found.")

if __name__ == "__main__":
    # Input path
    input_image = "C:/Users/tobia/.gemini/antigravity/brain/62780015-4cbf-44ef-aa84-694f87eee733/uploaded_image_1764223287355.png"
    # Output dir
    output_directory = "c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/assets"
    
    extract_avatars(input_image, output_directory)
