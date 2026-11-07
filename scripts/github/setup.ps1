#Requires -Version 5.1
<#
.SYNOPSIS
  Crea en GitHub las etiquetas, los hitos y los issues de Valserra (y opcionalmente el tablero).
.DESCRIPTION
  Usa GitHub CLI con tu sesión, así que todo queda creado desde tu cuenta.
  Se puede ejecutar varias veces: lo que ya existe no se duplica.
.EXAMPLE
  .\scripts\github\setup.ps1
  .\scripts\github\setup.ps1 -Tablero
#>
param(
  [string]$Repo,
  [switch]$Tablero
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$utf8 = New-Object System.Text.UTF8Encoding $false

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Falta GitHub CLI. Instálalo con: winget install GitHub.cli' }
$ErrorActionPreference = 'Continue'
gh auth status *> $null
$sesion = $LASTEXITCODE
$ErrorActionPreference = 'Stop'
if ($sesion -ne 0) { throw 'No has iniciado sesión. Ejecuta: gh auth login' }
if (-not $Repo) { $Repo = (gh repo view --json nameWithOwner -q .nameWithOwner).Trim() }
$owner = $Repo.Split('/')[0]
Write-Host "Repositorio: $Repo" -ForegroundColor Cyan

$data = Get-Content -Path (Join-Path $PSScriptRoot 'issues.json') -Raw -Encoding UTF8 | ConvertFrom-Json

Write-Host "`nEtiquetas" -ForegroundColor Cyan
foreach ($l in $data.labels) {
  gh label create $l.name --repo $Repo --color $l.color --description $l.description --force | Out-Null
  Write-Host "  $($l.name)"
}

Write-Host "`nHitos" -ForegroundColor Cyan
$hitos = gh api "repos/$Repo/milestones?state=all&per_page=100" | ConvertFrom-Json
foreach ($m in $data.milestones) {
  if ($hitos | Where-Object { $_.title -eq $m.title }) { Write-Host "  ya existe: $($m.title)"; continue }
  gh api "repos/$Repo/milestones" -f "title=$($m.title)" -f "description=$($m.description)" | Out-Null
  Write-Host "  $($m.title)"
}

Write-Host "`nIssues" -ForegroundColor Cyan
$existentes = @(gh issue list --repo $Repo --state all --limit 500 --json title | ConvertFrom-Json | ForEach-Object { $_.title })
$urls = @()
foreach ($i in $data.issues) {
  if ($existentes -contains $i.title) { Write-Host "  ya existe: $($i.title)"; continue }
  $tmp = [System.IO.Path]::GetTempFileName()
  [System.IO.File]::WriteAllText($tmp, $i.body, $utf8)
  $url = gh issue create --repo $Repo --title $i.title --body-file $tmp --milestone $i.milestone --label ($i.labels -join ',')
  Remove-Item $tmp
  $urls += $url
  Write-Host "  $url"
}

if ($Tablero) {
  Write-Host "`nTablero" -ForegroundColor Cyan
  $proyectos = gh project list --owner $owner --format json | ConvertFrom-Json
  $p = $proyectos.projects | Where-Object { $_.title -eq 'Valserra' } | Select-Object -First 1
  if (-not $p) { $p = gh project create --owner $owner --title 'Valserra' --format json | ConvertFrom-Json }
  gh project link $p.number --owner $owner --repo $Repo | Out-Null
  if ($urls.Count -eq 0) { $urls = gh issue list --repo $Repo --state open --limit 500 --json url -q '.[].url' }
  foreach ($u in $urls) { gh project item-add $p.number --owner $owner --url $u | Out-Null }
  Write-Host "  Tablero: $($p.url)"
}
Write-Host "`nListo." -ForegroundColor Green
