
import cv2
import numpy as np
import os

def fix_avatar_advanced(image_path):
    print(f"Processing {image_path}...")
    
    # Read image
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("Error: Could not load image.")
        return

    # Convert to grayscale for detection
    if img.shape[2] == 4:
        gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Add alpha if missing
        b, g, r = cv2.split(img)
        alpha = np.ones(b.shape, dtype=b.dtype) * 255
        img = cv2.merge([b, g, r, alpha])

    # Blur
    gray_blurred = cv2.medianBlur(gray, 5)

    # Detect circles
    circles = cv2.HoughCircles(
        gray_blurred, 
        cv2.HOUGH_GRADIENT, 
        dp=1, 
        minDist=100,
        param1=50,
        param2=30, # Lower = more sensitive
        minRadius=int(min(img.shape[:2])/4), # Assume button is at least half the image size
        maxRadius=int(max(img.shape[:2]))
    )

    if circles is not None:
        circles = np.round(circles[0, :]).astype("int")
        # Find the largest circle (likely the button)
        largest_circle = max(circles, key=lambda x: x[2])
        x, y, r = largest_circle
        
        print(f"Found button at ({x}, {y}) with radius {r}")
        
        # Create mask
        # We'll reduce the radius slightly (e.g. 1-2px) to cut off any white fringe
        safe_r = r - 2
        
        mask = np.zeros((img.shape[0], img.shape[1]), dtype=np.uint8)
        cv2.circle(mask, (x, y), safe_r, (255), -1)
        
        # Apply mask
        img[:, :, 3] = cv2.bitwise_and(img[:, :, 3], mask)
        
        # Optional: Crop to the circle?
        # Let's keep the original size to maintain alignment, or crop if it's huge.
        # But CSS 'cover' usually handles it.
        # Let's just mask it for now.
        
        cv2.imwrite(image_path, img)
        print("Applied circular mask based on detection.")
        
    else:
        print("No circles found. Falling back to center crop with thresholding.")
        # Fallback: Threshold to find non-white content
        # Invert gray if background is white (255)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if contours:
            # Largest contour
            c = max(contours, key=cv2.contourArea)
            ((x, y), r) = cv2.minEnclosingCircle(c)
            
            mask = np.zeros((img.shape[0], img.shape[1]), dtype=np.uint8)
            cv2.circle(mask, (int(x), int(y)), int(r-2), (255), -1)
            img[:, :, 3] = cv2.bitwise_and(img[:, :, 3], mask)
            
            cv2.imwrite(image_path, img)
            print("Applied mask based on contours.")

if __name__ == "__main__":
    path = "c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/assets/avatar_marcela.png"
    fix_avatar_advanced(path)
