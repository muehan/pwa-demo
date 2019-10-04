using Gmlu.PwaDemo.Providers;
using Gmlu.PwaDemo.ViewModels;
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

            var viewModel = new VapidViewModel();
            viewModel.PublicKey = vapidService.PublicKey;

            return Ok();
        }
    }
}