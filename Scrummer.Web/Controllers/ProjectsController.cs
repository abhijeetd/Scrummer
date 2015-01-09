using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Scrummer.Web.Controllers
{
    public class ProjectsController : BaseController
    {
        // GET: Projects
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PBIs(string id)
        {
            var user = GetCurrentUser();
            ViewBag.CurrentSprint = string.IsNullOrEmpty(id) ? user.Project : id;
            return View(user);
        }

        public ActionResult Activities(string id)
        {
            return View();
        }
        public ActionResult Leaderboard(string id)
        {
            return View();
        }
    }
}