using Scrummer.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Accounts
{
    public class User: Entity
    {
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Project { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public string Role { get; set; }
        public string Location { get; set; }
    }
}
