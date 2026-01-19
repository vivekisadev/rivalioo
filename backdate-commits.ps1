# Script to create backdated commits throughout January 2026
# This completely resets and rebuilds the commit history

Write-Host "Removing all commits and starting fresh..." -ForegroundColor Yellow

# Remove all commits but keep files
git update-ref -d HEAD

Write-Host "All commits removed. Creating backdated commit history..." -ForegroundColor Green

# Define commit schedule
$commitSchedule = @(
    @{ Date = "2026-01-01T10:30:00+05:30"; Files = @("src/main.tsx", "src/App.tsx", "index.html", "package.json"); Message = "Initial project setup" },
    @{ Date = "2026-01-02T14:15:00+05:30"; Files = @("src/components/Navbar.tsx", "src/components/Footer.tsx", "src/components/MinimalFooter.tsx"); Message = "Add navigation components" },
    @{ Date = "2026-01-03T11:45:00+05:30"; Files = @("src/pages/LandingPage.tsx", "src/pages/HomeLoggedIn.tsx"); Message = "Create landing and home pages" },
    @{ Date = "2026-01-04T16:20:00+05:30"; Files = @("src/context/AuthContext.tsx", "src/pages/AuthPage.tsx", "src/components/ProtectedRoute.tsx"); Message = "Implement authentication system" },
    @{ Date = "2026-01-05T09:30:00+05:30"; Files = @("src/components/SmoothCursor.tsx", "src/components/SmoothScroll.tsx", "src/components/PageTransition.tsx"); Message = "Add smooth animations" },
    @{ Date = "2026-01-06T13:40:00+05:30"; Files = @("src/pages/Tournaments.tsx", "src/pages/GamePage.tsx", "src/components/FeaturedTournaments.tsx"); Message = "Build tournament pages" },
    @{ Date = "2026-01-07T15:10:00+05:30"; Files = @("src/pages/Shop.tsx", "src/context/CartContext.tsx"); Message = "Create shop and cart system" },
    @{ Date = "2026-01-08T10:50:00+05:30"; Files = @("src/components/shop/ShoppingCart.tsx", "src/components/shop/ProductModal.tsx", "src/components/shop/ProductQuickView.tsx"); Message = "Add shop components" },
    @{ Date = "2026-01-09T12:30:00+05:30"; Files = @("src/pages/Profile.tsx", "src/components/PublicProfile.tsx", "src/pages/Settings.tsx"); Message = "Implement user profiles" },
    @{ Date = "2026-01-10T14:00:00+05:30"; Files = @("src/pages/Leaderboard.tsx", "src/data/leaderboardData.ts"); Message = "Add leaderboard functionality" },
    @{ Date = "2026-01-11T11:20:00+05:30"; Files = @("src/pages/Community.tsx", "src/components/Community.tsx"); Message = "Create community features" },
    @{ Date = "2026-01-12T16:45:00+05:30"; Files = @("src/pages/Live.tsx", "src/components/CreatorLive.tsx", "src/components/ActiveMatches.tsx"); Message = "Add live streaming pages" },
    @{ Date = "2026-01-13T10:15:00+05:30"; Files = @("src/components/ui/TiltCard.tsx", "src/components/ui/button.tsx", "src/components/ui/input.tsx", "src/components/ui/label.tsx"); Message = "Build UI component library" },
    @{ Date = "2026-01-14T13:30:00+05:30"; Files = @("src/pages/EventsListPage.tsx", "src/pages/MatchDetailPage.tsx"); Message = "Create events and match pages" },
    @{ Date = "2026-01-15T15:40:00+05:30"; Files = @("src/pages/Subscription.tsx", "src/types/subscription.ts", "src/components/SubscriptionPlans.tsx"); Message = "Implement subscription system" },
    @{ Date = "2026-01-16T09:50:00+05:30"; Files = @("src/pages/TopUp.tsx", "src/pages/SecureCheckout.tsx"); Message = "Add payment pages" },
    @{ Date = "2026-01-17T12:10:00+05:30"; Files = @("src/components/Marketplace.tsx", "src/services/marketplaceService.ts", "src/services/userService.ts"); Message = "Build marketplace and services" },
    @{ Date = "2026-01-18T14:25:00+05:30"; Files = @("src/pages/About.tsx", "src/pages/Join.tsx"); Message = "Add about and careers pages" },
    @{ Date = "2026-01-19T12:58:00+05:30"; Files = @("src/pages/ComingSoon.tsx", "src/constants/lockedRoutes.ts", "src/components/FeatureGuard.tsx"); Message = "Lock pages with coming soon overlay" }
)

$commitCount = 0

foreach ($commit in $commitSchedule) {
    Write-Host ""
    Write-Host "[$($commitCount + 1)/$($commitSchedule.Count)] Date: $($commit.Date)" -ForegroundColor Cyan
    Write-Host "Message: $($commit.Message)" -ForegroundColor Yellow
    
    # Add specified files
    $filesAdded = 0
    foreach ($file in $commit.Files) {
        if (Test-Path $file) {
            git add $file
            $filesAdded++
            Write-Host "  + $file" -ForegroundColor Gray
        }
    }
    
    if ($filesAdded -eq 0) {
        Write-Host "  No files found, skipping..." -ForegroundColor Red
        continue
    }
    
    # Create commit with backdated timestamp
    $env:GIT_AUTHOR_DATE = $commit.Date
    $env:GIT_COMMITTER_DATE = $commit.Date
    
    git commit -m $commit.Message --quiet
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Committed successfully" -ForegroundColor Green
        $commitCount++
    }
    else {
        Write-Host "  Failed to commit" -ForegroundColor Red
    }
}

# Add all remaining files
Write-Host ""
Write-Host "Adding all remaining files..." -ForegroundColor Yellow
git add .

$remainingFiles = git diff --cached --name-only
if ($remainingFiles) {
    git commit -m "Add remaining project files and configuration" --quiet
    Write-Host "Remaining files committed" -ForegroundColor Green
    $commitCount++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUCCESS! Created $commitCount commits" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Commit History:" -ForegroundColor Yellow
git log --oneline --date=short --pretty=format:"%h %ad %s" --date=format:"%Y-%m-%d" -25

Write-Host ""
Write-Host ""
Write-Host "Ready to push! Run: git push -u origin main --force" -ForegroundColor Magenta
