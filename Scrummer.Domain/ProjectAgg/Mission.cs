using Scrummer.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.ProjectAgg
{
    public class Mission : Entity
    {
        public string ProjectCode { get; set; }

        public string Title { get; set; }
        public int Points { get; set; }
    }
}
