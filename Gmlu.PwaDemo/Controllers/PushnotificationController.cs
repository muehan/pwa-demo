using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gmlu.PwaDemo.Providers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebPush;

namespace Gmlu.PwaDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushNotificationController : ControllerBase
    {
        private static List<PushSubscription> _subscriptions = new List<PushSubscription>();

        // POST: api/List
        [HttpPost]
        public void Post([FromBody] PushNotificationCommand command)
        {
            if (command.Action == "subscribe")
            {
                _subscriptions
                    .Add(
                        command.Subscription);
            }

            if (command.Action == "unsubscribe")
            {
                _subscriptions
                    .Remove(
                        command.Subscription);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var vapidProvider = VapidProvider.GetInstance();

            var vapidDetails = new VapidDetails(
                "http://localhost:5000",
                vapidProvider.PublicKey,
                vapidProvider.PrivateKey);

            var webPushClient = new WebPushClient();
            webPushClient.SetVapidDetails(vapidDetails);

            // send notification
            var payload = new PushNotificationPayload
            {
                Msg = "Test Message to everyone",
                Icon = "/assets/message.jpg"
            };

            foreach (var sub in _subscriptions)
            {
                try
                {
                    await webPushClient
                        .SendNotificationAsync(
                            sub,
                            JsonConvert.SerializeObject(payload),
                            vapidDetails);
                }
                catch (WebPushException exception)
                {
                    var statusCode = exception.StatusCode;
                    return new StatusCodeResult((int)statusCode);
                }
                catch(Exception ex)
                {
                    return new StatusCodeResult(500);
                }
            }

            return new OkResult();
        }
    }

    public class PushNotificationCommand
    {
        public string Action { get; set; }

        public PushSubscription Subscription { get; set; }
    }

    public class PushNotificationPayload
    {
        public string Msg { get; set; }

        public string Icon { get; set; }
    }
}
