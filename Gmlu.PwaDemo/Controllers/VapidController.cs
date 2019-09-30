using Gmlu.PwaDemo.Providers;
using Microsoft.AspNetCore.Mvc;

namespace Gmlu.PwaDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VapidController : ControllerBase
    {

        public IActionResult Get()
        {
            var vapidService = VapidProvider.GetInstance();

            return Ok();
        }
    }
}