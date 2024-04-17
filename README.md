

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }

    .container {
      display: flex;
      justify-content: space-between;
      padding: 20px;
    }

    .left-panel {
      width: 40%;
      padding: 20px;
      background-color: #fff;
    }

    .left-panel img {
      max-width: 100%;
    }

    .left-panel h1 {
      font-size: 24px;
    }

    .right-panel {
      width: 60%;
      padding: 20px;
      background-color: #fff;
    }

    .right-panel img {
      display: block;
      margin: 0 auto 20px;
      max-width: 100%;
    }

    .right-panel h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      display: block;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left-panel">
      <img src="left-image.png" alt="Left Image">
      <h1>Welcome!</h1>
    </div>
    <div class="right-panel">
      <img src="top-middle-image.png" alt="Top Middle Image">
      <h2>Login</h2>
      <form action="#">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</body>
</html>
