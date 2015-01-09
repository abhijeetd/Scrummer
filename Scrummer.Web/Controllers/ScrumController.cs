using Scrummer.Application;
using Scrummer.Domain.StandupAgg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Scrummer.Web.Extensions;

namespace Scrummer.Web.Controllers
{
    public class ScrumController : BaseController
    {
        StandupService standupService;
        AccountService accountService;
        public ScrumController()
        {
            standupService = ServiceFactory.GetStandupService();
            accountService = ServiceFactory.GetAccountService();
        }

        // GET: Standups
        public ActionResult Standups(string id, DateTime? date)
        {
            var user = GetCurrentUser();
            ViewBag.CurrentDate = date.HasValue ? date.Value : DateTime.Now;
            ViewBag.CurrentProject = string.IsNullOrEmpty(id) ? user.Project : id;
            return View(user);
        }

        public ActionResult Member(string id)
        {
            ViewBag.CurrentUser = id;
            var user = accountService.ValidateAndPopulateProfile(new Domain.Accounts.User { Username = id });
            if (user != null)
            {
                ViewBag.CurrentProject = user.Project;
            }
            return View();
        }
        public ActionResult ActionItems()
        {
            return View();
        }
    }
}