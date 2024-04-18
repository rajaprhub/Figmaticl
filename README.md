<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyPage.aspx.cs" Inherits="YourProjectName.Pages.MyPage" %>

<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome to My Page!</h1>
    <p>This is a sample ASP.NET Core .aspx page.</p>
</body>
</html>



using System;
using System.Web.UI;

namespace YourProjectName.Pages
{
    public partial class MyPage : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Code to execute when the page loads
        }
    }
}
