using System.Web.Mvc;

namespace Scrummer.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home";

            return View(GetCurrentUser());
        }
    }
}
