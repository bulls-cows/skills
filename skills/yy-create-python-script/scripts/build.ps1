$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$VenvDir = Join-Path $ProjectRoot ".venv"
$Python = Join-Path $VenvDir "Scripts/python.exe"
$SpecFile = Join-Path $ProjectRoot "python-script-template.spec"

if (-not (Test-Path $Python)) {
    python -m venv $VenvDir
}

& $Python -m pip install --upgrade pip
& $Python -m pip install -r (Join-Path $ProjectRoot "requirements.txt")
& $Python -m PyInstaller --clean --noconfirm $SpecFile
