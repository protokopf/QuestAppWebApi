using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuestAppWebApi.DataStorage.Entities;

namespace QuestAppWebApi.DataStorage.Model
{
    /// <summary>
    /// Context to quest data base.
    /// </summary>
    public class QuestDataBaseContext : DbContext
    {
        /// <summary>
        /// Quests table.
        /// </summary>
        public DbSet<Quest> Quests { get; set; } 
    }
}
