using Scrummer.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Scrummer.Web.Controllers
{
    public class AccountsController : BaseController
    {
        private AccountService accountService;
        public AccountsController()
        {
            accountService = ServiceFactory.GetAccountService();
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
