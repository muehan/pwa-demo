using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Gmlu.PwaDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly List<News> _news = new List<News>
        {
            new News { Title = "Bacon ipsum dolor amet commodo", Content = "Bacon ipsum dolor amet commodo ground round non officia ribeye." },
            new News { Title = "Deserunt incididunt labore", Content = "Deserunt incididunt labore swine laborum id, salami pork nulla. Dolor hamburger voluptate commodo pancetta picanha anim." },
            new News { Title = "Pancetta meatloaf fatback short ribs", Content = "Pancetta meatloaf fatback short ribs, cillum quis sirloin. Buffalo minim pork chop adipisicing porchetta sirloin, capicola sunt salami." },
            new News { Title = "Flank quis fugiat bacon pork", Content = "Flank quis fugiat bacon pork loin pastrami jowl culpa in. Velit turducken shank beef ribs veniam incididunt." },
            new News { Title = "Occaecat aliquip swine et in", Content = "Occaecat aliquip swine et in. Lorem magna shank doner, adipisicing meatloaf ribeye pork andouille turducken." },
        };

        // GET: api/List
        [HttpGet]
        public IEnumerable<News> Get()
        {
            return _news;
        }
    }

    public class News
    {
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
