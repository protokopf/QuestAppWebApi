using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestAppWebApi.DataStorage.Entities
{
    /// <summary>
    /// Quest entity.
    /// </summary>
    public class Quest
    {
        /// <summary>
        /// Quest id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Parents quest id.
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// Quest title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Description of the quest.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Time, when quest should start.
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Time, until which quest should be done.
        /// </summary>
        public DateTime Deadline { get; set; }

        /// <summary>
        /// Current quest state.
        /// </summary>
        public int CurrentState { get; set; }

        /// <summary>
        /// Points, whether quest important or not.
        /// </summary>
        public bool IsImportant { get; set; }
    }
}
