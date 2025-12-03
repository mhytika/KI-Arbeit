Add-Type -AssemblyName System.Drawing

$assetsDir = "c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/assets"
$brainDir = "C:/Users/tobia/.gemini/antigravity/brain/62780015-4cbf-44ef-aa84-694f87eee733"

# Map roles to their raw source files
$avatars = @{
    "max" = "$brainDir/avatar_max_raw_1764227905332.png"
    "toni" = "$brainDir/avatar_toni_raw_1764227919694.png"
    "ahmed" = "$brainDir/avatar_ahmed_raw_1764228277847.png"
    "maria" = "$brainDir/avatar_maria_raw_1764228318151.png"
    "marcela" = "FALLBACK_TONI" # We will use Toni's base and shift color
}

function Process-Avatar {
    param (
        [string]$InputPath,
        [string]$OutputPath,
        [bool]$ShiftHue = $false,
        [int]$TargetHue = 0 # 0-360
    )

    if (-not (Test-Path $InputPath)) {
        Write-Host "Error: Input file not found: $InputPath"
        return
    }

    $img = [System.Drawing.Bitmap]::FromFile($InputPath)
    $size = [Math]::Min($img.Width, $img.Height)
    
    # Create square bitmap
    $square = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($square)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Circular crop
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(0, 0, $size, $size)
    $g.SetClip($path)
    
    # Draw original centered
    $x = ($img.Width - $size) / 2
    $y = ($img.Height - $size) / 2
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $size, $size)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    
    # If shifting hue (simple tinting approach for fallback)
    # Real hue shift is complex in GDI+, we'll use a color matrix to rotate hue roughly
    # Or just overlay a color.
    # Let's try a simple color matrix for Orange tint if needed.
    
    $attrs = New-Object System.Drawing.Imaging.ImageAttributes
    
    if ($ShiftHue) {
        # Marcela is Orange. Toni is Purple.
        # We want to shift Purple to Orange.
        # Simple approach: Recolor.
        # Matrix to swap channels or tint?
        # Let's try to push Red up and Blue down.
        
        # R G B A W
        $matrix = @(
            @(1.5, 0.0, 0.0, 0.0, 0.0), # Red scale
            @(0.0, 1.0, 0.0, 0.0, 0.0), # Green scale
            @(0.0, 0.0, 0.2, 0.0, 0.0), # Blue scale (reduce blue)
            @(0.0, 0.0, 0.0, 1.0, 0.0), # Alpha
            @(0.2, 0.1, 0.0, 0.0, 1.0)  # Translations
        )
        
        $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix(,$matrix)
        $attrs.SetColorMatrix($colorMatrix)
    }

    $g.DrawImage($img, $destRect, $x, $y, $size, $size, [System.Drawing.GraphicsUnit]::Pixel, $attrs)
    
    $square.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved $OutputPath"
    
    $g.Dispose()
    $square.Dispose()
    $img.Dispose()
}

# Process normal avatars
foreach ($name in $avatars.Keys) {
    $source = $avatars[$name]
    $dest = Join-Path $assetsDir "avatar_$name.png"
    
    if ($source -eq "FALLBACK_TONI") {
        # Use Toni's raw file
        $toniSource = $avatars["toni"]
        Write-Host "Processing Marcela (Fallback from Toni)..."
        Process-Avatar -InputPath $toniSource -OutputPath $dest -ShiftHue $true
    } else {
        Write-Host "Processing $name..."
        Process-Avatar -InputPath $source -OutputPath $dest
    }
}
