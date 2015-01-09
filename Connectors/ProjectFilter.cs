using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectors
{
    public class ProjectFilter
    {
        public string ConnectionString { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public string ProjectName { get; set; }
        public string ReleaseName { get; set; }
    }
}
