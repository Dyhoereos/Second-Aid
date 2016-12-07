using System;
using System.Collections.Generic;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Second_Aid.Droid
{
    [Activity(Label = "LoginActivity", MainLauncher = true)]
    public class LoginActivity : Activity
    {

        Button login;

        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.login);

            //Initializing button from layout
            login = FindViewById<Button>(Resource.Id.login);

            var usernameInput = FindViewById<EditText>(Resource.Id.userName);
            var passwordInput = FindViewById<EditText>(Resource.Id.password);
            var clinicIdInput = FindViewById<EditText>(Resource.Id.clinicId);

            //Login button click action
            login.Click += async (object sender, EventArgs e) => {
                this.login.Enabled = false;

                Console.Write("BUTTON CLICKED");

                var username = usernameInput.Text.ToString().Trim();
                var password = passwordInput.Text.ToString();
                var clinicId = clinicIdInput.Text.ToString();

                var token = await Login(Constants.BASE_URL + Constants.LOGIN_URL, username, password, clinicId);

                if (token != null)
                {
                    Intent scheduleActivityIntent = new Intent(this, typeof(MainPageActivity));
                    scheduleActivityIntent.PutExtra(Constants.TOKEN_KEY, token);
                    StartActivity(scheduleActivityIntent);
                }

                this.login.Enabled = true;
            };
        }

        private async Task<string> Login(string url, string username, string password, string clinicId)
        {
            using (var client = new HttpClient())
            {
                var values = new Dictionary<string, string>
                {
                   { "grant_type", "password" },
                   { "username", username },
                   { "password", password },
                   { "clinic_id", clinicId }
                };

                var content = new FormUrlEncodedContent(values);

                var response = await client.PostAsync(url, content);

                var responseString = await response.Content.ReadAsStringAsync();

                if (responseString == null) // check for response 
                {
                    Toast.MakeText(this, "No response from server.", ToastLength.Long).Show();
                    return null;
                }

                var responseJson = JObject.Parse(responseString);

                if (responseJson == null)   // check for compatible format 
                {
                    Toast.MakeText(this, "No data received from server.", ToastLength.Long).Show();
                    return null;
                }

                var token = responseJson.GetValue("access_token");

                if (token == null)          // check for token 
                {
                    Toast.MakeText(this, "Invalid credentials.", ToastLength.Long).Show();
                    return null;
                }

                return token.ToString();
            }
        }

    }
}