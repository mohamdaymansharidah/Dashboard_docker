# Laravel Auth API (Sanctum)

A simple RESTful authentication API built with Laravel using Sanctum for
token-based authentication.

------------------------------------------------------------------------

## 🚀 Features

-   User Registration
-   User Login
-   Logout (Token Revocation)
-   Forgot Password (Token-based)
-   Reset Password
-   Protected Routes using Sanctum

------------------------------------------------------------------------

## 🧱 Tech Stack

-   Laravel 10+
-   PHP 8.2+
-   MySQL
-   Laravel Sanctum

------------------------------------------------------------------------

## ⚙️ Installation

### 1. Clone Project

``` bash
git clone <git@github.com:ahmedmo2399/authLaravel.gitl>
cd auth-api
```

### 2. Install Dependencies

``` bash
composer install
```

### 3. Setup Environment

``` bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure Database (.env)

``` env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=auth_api
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run Migrations

``` bash
php artisan migrate
