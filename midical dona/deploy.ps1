param(
  [string]$remoteUrl
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error 'Git غير مثبت. يرجى تثبيت Git ثم إعادة المحاولة.'
  exit 1
}

if (-not $remoteUrl) {
  Write-Host 'استخدام:'
  Write-Host '  .\deploy.ps1 <repository-url>'
  Write-Host 'مثال:'
  Write-Host '  .\deploy.ps1 https://github.com/username/repository.git'
  exit 1
}

if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
  git init
}

git branch -M main

git add .
git commit -m 'Initial medical site commit' --allow-empty

$remote = git remote get-url origin 2>$null
if ($remote) {
  git remote set-url origin $remoteUrl
} else {
  git remote add origin $remoteUrl
}

git push -u origin main
Write-Host 'تم النشر على GitHub. يمكنك الآن تفعيل GitHub Pages من إعدادات المستودع.'
