using Gmlu.PwaDemo.ViewModels;
using Newtonsoft.Json;
using System.IO;
using WebPush;

namespace Gmlu.PwaDemo.Providers
{
    public class VapidPersistanceProvider
    {
        private readonly string _filename = "vapidPersistance";

        public void SaveToFile(VapidDetails model)
        {
            if(!File.Exists(_filename))
            {
                File.Create(_filename);
            }

            File.WriteAllText(
                _filename,
                JsonConvert
                    .SerializeObject(
                        model));
        }

        public VapidDetails GetFromFile()
        {
            if (!File.Exists(_filename))
            {
                return null;
            }

            var text = File
                .ReadAllText(
                    _filename);

            var model = JsonConvert.DeserializeObject<VapidDetails>(text);

            return model;
        }
    }
}
