
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        .btn-login {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #007bff;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn-login:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn-login">Login</button>
            </div>
        </form>
        <div id="progress" style="display: none;">
            <img src="path_to_indicator.gif" alt="Loading...">
            <p>Please wait...</p>
        </div>
        <div id="errorMessages" style="color: red;"></div>
    </div>

    <script>
        const loginForm = document.getElementById('loginForm');
        const progress = document.getElementById('progress');
        const errorMessages = document.getElementById('errorMessages');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Display progress
            progress.style.display = 'block';

            // Simulate login process
            setTimeout(() => {
                // Check credentials (replace with actual validation)
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                if (username === 'user' && password === 'password') {
                    // Successful login, redirect or show success message
                    window.location.href = 'dashboard.html';
                } else {
                    // Show error message
                    errorMessages.innerHTML = 'Invalid username or password. Please try again.';
                }

                // Hide progress
                progress.style.display = 'none';
            }, 2000); // Simulating 2 seconds for login process
        });
    </script>
</body>
</html>
