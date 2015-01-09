using Connectors;
using Scrummer.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.ProjectAgg
{
    public class Project: Entity
    {
        public string Code { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }

        public ProjectFilter Details { get; set; }
    }
}
