Add-Type -AssemblyName System.Drawing

$inputPath = "C:/Users/tobia/.gemini/antigravity/brain/62780015-4cbf-44ef-aa84-694f87eee733/uploaded_image_1764223287355.png"
$outputDir = "c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/assets"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$img = [System.Drawing.Bitmap]::FromFile($inputPath)
$width = $img.Width
$height = $img.Height

Write-Host "Image loaded: $width x $height"

# Define approximate zones for each avatar
# [Name, x_min, y_min, x_max, y_max]
$zones = @(
    @("max", 0, 0, [int]($width/2), [int]($height*0.4)),
    @("toni", [int]($width/2), 0, $width, [int]($height*0.4)),
    @("ahmed", [int]($width*0.3), [int]($height*0.3), [int]($width*0.7), [int]($height*0.7)),
    @("maria", 0, [int]($height*0.6), [int]($width/2), $height),
    @("marcela", [int]($width/2), [int]($height*0.6), $width, $height)
)

function Get-BoundingBox($bitmap, $x1, $y1, $x2, $y2) {
    $minX = $x2
    $maxX = $x1
    $minY = $y2
    $maxY = $y1
    $found = $false

    # Scan with a step to be faster, then refine? 
    # Or just scan all. 1MP is okay.
    # We'll scan every 2nd pixel to speed up
    for ($y = $y1; $y -lt $y2; $y+=2) {
        for ($x = $x1; $x -lt $x2; $x+=2) {
            $color = $bitmap.GetPixel($x, $y)
            # Check if not white/transparent
            # Assuming white background is (255, 255, 255)
            if ($color.A -gt 0 -and ($color.R -lt 250 -or $color.G -lt 250 -or $color.B -lt 250)) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
                $found = $true
            }
        }
    }

    if (-not $found) { return $null }
    
    # Add padding
    $padding = 5
    $minX = [Math]::Max($x1, $minX - $padding)
    $minY = [Math]::Max($y1, $minY - $padding)
    $maxX = [Math]::Min($x2, $maxX + $padding)
    $maxY = [Math]::Min($y2, $maxY + $padding)

    # Make it square
    $w = $maxX - $minX
    $h = $maxY - $minY
    $size = [Math]::Max($w, $h)
    
    # Center the square
    $centerX = ($minX + $maxX) / 2
    $centerY = ($minY + $maxY) / 2
    
    $minX = [int]($centerX - $size/2)
    $minY = [int]($centerY - $size/2)
    
    return @{X=$minX; Y=$minY; Size=$size}
}

foreach ($zone in $zones) {
    $name = $zone[0]
    $x1 = $zone[1]
    $y1 = $zone[2]
    $x2 = $zone[3]
    $y2 = $zone[4]

    Write-Host "Processing $name..."
    $bbox = Get-BoundingBox $img $x1 $y1 $x2 $y2

    if ($bbox) {
        $size = $bbox.Size
        $cropRect = New-Object System.Drawing.Rectangle($bbox.X, $bbox.Y, $size, $size)
        
        # Create new bitmap for the avatar
        $avatar = New-Object System.Drawing.Bitmap($size, $size)
        $g = [System.Drawing.Graphics]::FromImage($avatar)
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        
        # Create a circular path
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse(0, 0, $size, $size)
        
        # Set clip to circle
        $g.SetClip($path)
        
        # Draw the original image into the new bitmap
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
        $g.DrawImage($img, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
        
        # Save
        $outputPath = Join-Path $outputDir "avatar_$name.png"
        $avatar.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "Saved $outputPath"
        
        $g.Dispose()
        $avatar.Dispose()
    } else {
        Write-Host "No content found for $name"
    }
}

$img.Dispose()
