using Scrummer.Domain.Standups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Accounts
{
    public class UserContext : SearchContext
    {
        public string Username { get; set; }
        public string Project { get; set; }
    }
}
