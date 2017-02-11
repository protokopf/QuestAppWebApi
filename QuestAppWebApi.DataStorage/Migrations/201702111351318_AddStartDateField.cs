namespace QuestAppWebApi.DataStorage.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStartDateField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Quests", "StartDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Quests", "StartDate");
        }
    }
}
