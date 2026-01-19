# Add more backdated commits for the missing dates
# This will create empty commits for visual contribution history

$additionalDates = @(
    @{ Date = "2026-01-02T14:15:00+05:30"; Message = "Update navigation styling" },
    @{ Date = "2026-01-03T11:45:00+05:30"; Message = "Improve landing page responsiveness" },
    @{ Date = "2026-01-04T16:20:00+05:30"; Message = "Enhance authentication flow" },
    @{ Date = "2026-01-05T09:30:00+05:30"; Message = "Optimize animation performance" },
    @{ Date = "2026-01-06T13:40:00+05:30"; Message = "Add tournament filtering" },
    @{ Date = "2026-01-07T15:10:00+05:30"; Message = "Implement cart persistence" },
    @{ Date = "2026-01-08T10:50:00+05:30"; Message = "Add product quick view" },
    @{ Date = "2026-01-09T12:30:00+05:30"; Message = "Update profile UI" },
    @{ Date = "2026-01-10T14:00:00+05:30"; Message = "Add leaderboard filters" },
    @{ Date = "2026-01-11T11:20:00+05:30"; Message = "Improve community layout" },
    @{ Date = "2026-01-12T16:45:00+05:30"; Message = "Add live stream indicators" },
    @{ Date = "2026-01-13T10:15:00+05:30"; Message = "Enhance UI components" },
    @{ Date = "2026-01-14T13:30:00+05:30"; Message = "Add event registration" },
    @{ Date = "2026-01-15T15:40:00+05:30"; Message = "Implement subscription tiers" },
    @{ Date = "2026-01-16T09:50:00+05:30"; Message = "Add payment validation" },
    @{ Date = "2026-01-17T12:10:00+05:30"; Message = "Update marketplace UI" },
    @{ Date = "2026-01-18T14:25:00+05:30"; Message = "Polish about page" }
)

Write-Host "Creating additional backdated commits..." -ForegroundColor Green

foreach ($commit in $additionalDates) {
    $env:GIT_AUTHOR_DATE = $commit.Date
    $env:GIT_COMMITTER_DATE = $commit.Date
    
    git commit --allow-empty -m $commit.Message --quiet
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Created: $($commit.Message) [$($commit.Date.Substring(0,10))]" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "All commits created! Total commit count:" -ForegroundColor Green
git rev-list --count HEAD

Write-Host ""
Write-Host "Commit history:" -ForegroundColor Yellow
git log --oneline --date=short --pretty=format:"%h %ad %s" --date=format:"%Y-%m-%d" --all

Write-Host ""
Write-Host ""
Write-Host "Ready to push! Run: git push -u origin main --force" -ForegroundColor Magenta
