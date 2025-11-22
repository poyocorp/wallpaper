# generar-assets.ps1
$folder = "..\imgs"
$extensions = @("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp")
$outputFile = "files-db.js"

$files = foreach ($ext in $extensions) {
    Get-ChildItem -Path $folder -Filter $ext -File -Recurse
}

$files = $files | Sort-Object Name

# Crear contenido JavaScript
$jsContent = "const assets = ["
foreach ($file in $files) {
    $jsContent += "`n  `"./imgs/$($file.Name)`","
}
$jsContent = $jsContent.TrimEnd(',')
$jsContent += "`n];"

# Guardar
[System.IO.File]::WriteAllText($outputFile, $jsContent, [System.Text.Encoding]::UTF8)

Write-Host "Archivo '$outputFile' generado con $($files.Count) assets"