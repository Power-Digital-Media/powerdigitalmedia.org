# ══════════════════════════════════════════════════════
# POWER DIGITAL MEDIA — Stripe Product & Price Creator
# Creates all 18 service tiers via the Stripe API
# ══════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

# Read the secret key from .env.local
$envFile = Join-Path (Join-Path $PSScriptRoot "..") ".env.local"
$envContent = Get-Content $envFile -Raw
if ($envContent -match 'STRIPE_SECRET_KEY=(.+)') {
    $SK = $Matches[1].Trim()
} else {
    Write-Error "Could not find STRIPE_SECRET_KEY in .env.local"
    exit 1
}

Write-Host ""
Write-Host "Power Digital Media - Stripe Product Factory" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host ""

# Base64 encode for Basic auth
$pair = "${SK}:"
$bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
$base64 = [System.Convert]::ToBase64String($bytes)

$headers = @{
    "Authorization" = "Basic $base64"
    "Content-Type"  = "application/x-www-form-urlencoded"
}

# ── Product Definitions ───────────────────────────────
$products = @(
    # Web Design (one-time)
    @{ name = "Identity Build";       price = 150000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_WEB_IDENTITY" }
    @{ name = "Growth Build";         price = 300000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_WEB_GROWTH" }
    @{ name = "Enterprise Build";     price = 500000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_WEB_ENTERPRISE" }

    # Management (monthly)
    @{ name = "Build and Manage";     price = 50000;   recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_MANAGEMENT" }

    # Podcasting (monthly)
    @{ name = "Broadcaster Entry";    price = 50000;   recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_POD_BROADCASTER" }
    @{ name = "Growth Engine";        price = 100000;  recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_POD_GROWTH" }
    @{ name = "Syndication Suite";    price = 150000;  recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_POD_SYNDICATION" }

    # Production Hub (one-time)
    @{ name = "Field Acquisition";    price = 50000;   recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_PROD_FIELD" }
    @{ name = "Live Broadcast";       price = 75000;   recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_PROD_LIVE" }
    @{ name = "Production Protocol";  price = 100000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_PROD_PROTOCOL" }
    @{ name = "Authority Package";    price = 150000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_PROD_AUTHORITY" }

    # Growth & Social
    @{ name = "Micro-Growth";         price = 25000;   recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_MICRO" }
    @{ name = "Social Velocity";      price = 75000;   recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_VELOCITY" }
    @{ name = "Branding Protocol";    price = 75000;   recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_BRANDING" }
    @{ name = "Elite Audit";          price = 50000;   recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_AUDIT" }
    @{ name = "Tech Deployment";      price = 150000;  recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_TECH" }

    # Bespoke (placeholder $1)
    @{ name = "Bespoke Installment";  price = 100;     recurring = $false; env = "NEXT_PUBLIC_STRIPE_PRICE_INSTALLMENT_BESPOKE" }
    @{ name = "Bespoke Recurring";    price = 100;     recurring = $true;  env = "NEXT_PUBLIC_STRIPE_PRICE_RECURRING_BESPOKE" }
)

$envOutput = @()
$created = 0

foreach ($p in $products) {
    Write-Host "  Creating: $($p.name)..." -NoNewline

    try {
        # Step 1: Create the Product (form-encoded body string)
        $productBody = "name=$([uri]::EscapeDataString($p.name))"

        $product = Invoke-RestMethod -Uri "https://api.stripe.com/v1/products" `
            -Method POST `
            -Headers $headers `
            -Body $productBody

        # Step 2: Create the Price (form-encoded body string)
        $priceBody = "product=$($product.id)&unit_amount=$($p.price)&currency=usd"
        if ($p.recurring) {
            $priceBody += "&recurring[interval]=month"
        }

        $price = Invoke-RestMethod -Uri "https://api.stripe.com/v1/prices" `
            -Method POST `
            -Headers $headers `
            -Body $priceBody

        $envOutput += "$($p.env)=$($price.id)"
        $created++

        $displayPrice = "$" + ($p.price / 100).ToString("N2")
        $billing = if ($p.recurring) { "/mo" } else { " one-time" }
        Write-Host " OK ${displayPrice}${billing} -> $($price.id)" -ForegroundColor Green

    } catch {
        Write-Host " FAILED: $($_.Exception.Message)" -ForegroundColor Red
        # Try to get more detail
        if ($_.Exception.Response) {
            try {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $detail = $reader.ReadToEnd()
                Write-Host "    Detail: $detail" -ForegroundColor DarkRed
            } catch {}
        }
    }
}

# ── Output Results ────────────────────────────────────
Write-Host ""
Write-Host "================================================" -ForegroundColor DarkGray
Write-Host "Created $created / $($products.Count) products" -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy the following into your .env.local:" -ForegroundColor Yellow
Write-Host "--------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

foreach ($line in $envOutput) {
    Write-Host $line -ForegroundColor White
}

# Also save to a file for easy copy
$outputFile = Join-Path $PSScriptRoot "stripe-price-ids.env"
$envOutput | Out-File -FilePath $outputFile -Encoding utf8
Write-Host ""
Write-Host "Saved to: $outputFile" -ForegroundColor DarkGray
