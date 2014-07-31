using Scrummer.Application;
using Scrummer.Infrastructure.Mongo;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System.Web.Mvc;
using Scrummer.Web.Extensions;
using Scrummer.Domain.Accounts;
using System.Security.Principal;
using Scrummer.DirectoryServices;
using System.Web;

namespace Scrummer.Web.Controllers
{
    public class BaseController: Controller
    {
        protected User GetCurrentUser()
        {
            var currentUser = Session.CurrentUser();
            if (currentUser == null)
            {
                currentUser = ValidateAndCreateUser();
            }
            return currentUser;
        }
        private User ValidateAndCreateUser()
        {
            var accountService = ServiceFactory.GetAccountService();
            IIdentity winId = User.Identity;
            string username = winId.Name.Split('\\')[1];
            string domain = winId.Name.Split('\\')[0];
            User profile = new User { Username = username };

            User currentUser = accountService.ValidateAndPopulateProfile(profile);
            if (currentUser == null)
            {
                UserManager directoryService = new UserManager();
                var directoryUser = directoryService.GetUserDetails(domain, username);
                if (directoryUser == null)
                    throw new HttpException(401, "Unauthorized Access");

                profile.Firstname = directoryUser.Firstname;
                profile.Lastname = directoryUser.Lastname;
                profile.Email = directoryUser.Email;
                profile.IsActive = true;
                currentUser = accountService.AddUser(profile);
            }

            Session.CurrentUser(currentUser);
            return currentUser;
        }
    }
}
