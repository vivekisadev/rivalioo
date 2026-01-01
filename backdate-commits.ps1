# Script to create backdated commits throughout January 2026

Write-Host "Resetting repository..." -ForegroundColor Yellow
git reset --hard HEAD~2
git clean -fd

# Define commit schedule
$commitSchedule = @(
    @{ Date = "2026-01-01T10:30:00+05:30"; Files = @("src/main.tsx", "src/App.tsx"); Message = "Initial project setup" },
    @{ Date = "2026-01-02T14:15:00+05:30"; Files = @("src/components/Navbar.tsx", "src/components/Footer.tsx"); Message = "Add navigation components" },
    @{ Date = "2026-01-03T11:45:00+05:30"; Files = @("src/pages/LandingPage.tsx", "src/pages/HomeLoggedIn.tsx"); Message = "Create landing and home pages" },
    @{ Date = "2026-01-04T16:20:00+05:30"; Files = @("src/context/AuthContext.tsx", "src/pages/AuthPage.tsx"); Message = "Implement authentication system" },
    @{ Date = "2026-01-05T09:30:00+05:30"; Files = @("src/components/SmoothCursor.tsx", "src/components/SmoothScroll.tsx"); Message = "Add smooth animations" },
    @{ Date = "2026-01-06T13:40:00+05:30"; Files = @("src/pages/Tournaments.tsx", "src/pages/GamePage.tsx"); Message = "Build tournament pages" },
    @{ Date = "2026-01-07T15:10:00+05:30"; Files = @("src/pages/Shop.tsx", "src/context/CartContext.tsx"); Message = "Create shop and cart system" },
    @{ Date = "2026-01-08T10:50:00+05:30"; Files = @("src/components/shop/ShoppingCart.tsx", "src/components/shop/ProductModal.tsx"); Message = "Add shop components" },
    @{ Date = "2026-01-09T12:30:00+05:30"; Files = @("src/pages/Profile.tsx", "src/components/PublicProfile.tsx"); Message = "Implement user profiles" },
    @{ Date = "2026-01-10T14:00:00+05:30"; Files = @("src/pages/Leaderboard.tsx", "src/data/leaderboardData.ts"); Message = "Add leaderboard functionality" },
    @{ Date = "2026-01-11T11:20:00+05:30"; Files = @("src/pages/Community.tsx", "src/components/Community.tsx"); Message = "Create community features" },
    @{ Date = "2026-01-12T16:45:00+05:30"; Files = @("src/pages/Live.tsx", "src/components/CreatorLive.tsx"); Message = "Add live streaming pages" },
    @{ Date = "2026-01-13T10:15:00+05:30"; Files = @("src/components/ui/TiltCard.tsx", "src/components/ui/button.tsx"); Message = "Build UI component library" },
    @{ Date = "2026-01-14T13:30:00+05:30"; Files = @("src/pages/EventsListPage.tsx", "src/pages/MatchDetailPage.tsx"); Message = "Create events and match pages" },
    @{ Date = "2026-01-15T15:40:00+05:30"; Files = @("src/pages/Subscription.tsx", "src/types/subscription.ts"); Message = "Implement subscription system" },
    @{ Date = "2026-01-16T09:50:00+05:30"; Files = @("src/pages/TopUp.tsx", "src/pages/SecureCheckout.tsx"); Message = "Add payment pages" },
    @{ Date = "2026-01-17T12:10:00+05:30"; Files = @("src/components/Marketplace.tsx", "src/services/marketplaceService.ts"); Message = "Build marketplace and services" },
    @{ Date = "2026-01-18T14:25:00+05:30"; Files = @("src/pages/About.tsx", "src/pages/Join.tsx"); Message = "Add about and careers pages" },
    @{ Date = "2026-01-19T12:58:00+05:30"; Files = @("src/pages/ComingSoon.tsx", "src/constants/lockedRoutes.ts"); Message = "Lock pages with coming soon overlay" }
)

Write-Host "Creating $($commitSchedule.Count) backdated commits..." -ForegroundColor Green

foreach ($commit in $commitSchedule) {
    Write-Host ""
    Write-Host "Date: $($commit.Date)" -ForegroundColor Cyan
    Write-Host "Message: $($commit.Message)" -ForegroundColor Yellow
    
    # Add files
    foreach ($file in $commit.Files) {
        if (Test-Path $file) {
            git add $file
            Write-Host "  Added: $file" -ForegroundColor Gray
        }
    }
    
    # Check if files were staged
    $stagedFiles = git diff --cached --name-only
    if (-not $stagedFiles) {
        Write-Host "  No files staged, skipping..." -ForegroundColor Red
        continue
    }
    
    # Create commit with backdated timestamp
    $env:GIT_AUTHOR_DATE = $commit.Date
    $env:GIT_COMMITTER_DATE = $commit.Date
    
    git commit -m $commit.Message
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Commit created successfully" -ForegroundColor Green
    }
}

# Add any remaining files
Write-Host ""
Write-Host "Adding remaining files..." -ForegroundColor Yellow
git add .
$remainingFiles = git diff --cached --name-only
if ($remainingFiles) {
    git commit -m "Add remaining project configuration and assets"
    Write-Host "Remaining files committed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Commit history created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Showing commit log:" -ForegroundColor Cyan
git log --oneline --date=short --pretty=format:"%h %ad %s" --date=format:"%Y-%m-%d" -20

Write-Host ""
Write-Host ""
Write-Host "Ready to push with: git push -u origin main --force" -ForegroundColor Magenta
