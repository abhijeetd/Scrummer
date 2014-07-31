using Scrummer.Domain.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Scrummer.Web.Extensions
{
    public static class HttpContextExtensions
    {
        public static User CurrentUser(this HttpSessionStateBase session)
        {
            return session["CurrentUser"] as User;
        }

        public static void CurrentUser(this HttpSessionStateBase session, User profile)
        {
            session["CurrentUser"] = profile;
        }
    }
}