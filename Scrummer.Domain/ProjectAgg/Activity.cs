using Scrummer.Domain.Seedwork;

namespace Scrummer.Domain.ProjectAgg
{
    public class Activity : Entity
    {
        public string ProjectCode { get; set; }

        public string Title { get; set; }
        public int UpVotesRequired { get; set; }
        public int Points { get; set; }
    }
}
