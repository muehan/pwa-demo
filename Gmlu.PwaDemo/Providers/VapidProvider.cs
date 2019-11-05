using WebPush;

namespace Gmlu.PwaDemo.Providers
{
    public class VapidProvider
    {

        private static VapidProvider _instance;

        private readonly VapidDetails _vapidDetails;

        private VapidProvider()
        {
            var persistance = new VapidPersistanceProvider();

            var model = persistance.GetFromFile();
            if(model == null)
            {
                _vapidDetails = VapidHelper
                    .GenerateVapidKeys();

                persistance
                    .SaveToFile(
                        _vapidDetails);
            } else
            {
                _vapidDetails = model;
            }
        }

        public static VapidProvider GetInstance()
        {
            if(_instance == null)
            {
                _instance = new VapidProvider();
            }

            return _instance;
        }

        public string PublicKey => _vapidDetails.PublicKey;

        public string PrivateKey => _vapidDetails.PrivateKey;
    }
}
