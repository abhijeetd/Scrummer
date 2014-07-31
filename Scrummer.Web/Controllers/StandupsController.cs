using Scrummer.Application;
using Scrummer.Domain.Standups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Scrummer.Web.Extensions;

namespace Scrummer.Web.Controllers
{
    public class StandupsController : BaseController
    {
        StandupService standupService;
        public StandupsController()
        {
            standupService = ServiceFactory.GetStandupService();
        }

        // GET: Standups
        public ActionResult Index(string id)
        {
            var user = GetCurrentUser();
            ViewBag.CurrentProject = string.IsNullOrEmpty(id) ? user.Project : id;
            return View(user);
        }

        public ActionResult Member(string id)
        {
            ViewBag.CurrentUser = id;
            return View();
        }
    }
}