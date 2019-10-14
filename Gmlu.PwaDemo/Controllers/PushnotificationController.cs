using System;
using System.Collections.Generic;
using System.Linq;
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
        public IActionResult Post([FromBody] PushNotificationCommand command)
        {
            if(command.Subscription == null)
            {
                return BadRequest();
            }

            if (command.Action == "subscribe")
            {
                if(!_subscriptions.Any(x => x.Auth == command.Subscription.Auth))
                {
                    _subscriptions
                        .Add(
                            command.Subscription);

                    return Ok();
                }

                return BadRequest();
            }

            if (command.Action == "unsubscribe")
            {
                var existingSubscription = _subscriptions.SingleOrDefault(x => x.Auth == command.Subscription.Auth);

                if(existingSubscription != null)
                {
                    _subscriptions
                        .Remove(
                            existingSubscription);

                    return Ok();
                }

                return BadRequest();
            }

            return BadRequest();
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
