using WebPush;

namespace Gmlu.PwaDemo.Providers
{
    public class VapidProvider
    {

        private static VapidProvider _instance;

        private readonly VapidDetails _vapidKeys;

        private VapidProvider()
        {
            _vapidKeys = VapidHelper.GenerateVapidKeys();
        }

        public static VapidProvider GetInstance()
        {
            if(_instance == null)
            {
                _instance = new VapidProvider();
            }

            return _instance;
        }

        public string PublicKey => _vapidKeys.PublicKey;

        public string PrivateKey => _vapidKeys.PrivateKey;
    }
}
