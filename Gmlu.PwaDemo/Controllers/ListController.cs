using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Gmlu.PwaDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly List<string> _items = new List<string>
        {
            "salt", "pepper", "coffee", "bananas"
        };

        // GET: api/List
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _items;
        }

        // POST: api/List
        [HttpPost]
        public void Post([FromBody] string value)
        {
            if(!string.IsNullOrWhiteSpace(value)) _items.Add(value);
        }

        // PUT: api/List/5
        [HttpPut]
        public void Put([FromBody] string value)
        {
            if (!string.IsNullOrWhiteSpace(value)) _items[_items.FindIndex(x => x == value)] = value;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public void Delete([FromBody] string value)
        {
            if (!string.IsNullOrWhiteSpace(value) && _items.Any(x => x == value)) _items.Remove(value);
        }
    }
}
