$(document).ready(function () {

    function QuestListViewModel()
    {
        var self = this;

        self.QuestList = ko.observableArray([]);

        self.GetQuestList = function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:37993/api/Quests",
                dataType: "json",
                success: function (data) {
                    self.QuestList(data);
                }
            });
        }

        self.DeleteQuest = function (quest) {
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "http://localhost:37993/api/Quests/" + quest.Id,
                success: function (data) {
                    self.QuestList.remove(function (q) {
                        return q.Id === quest.Id;
                    });
                }
            });
        }
    }

    var ViewModel = new QuestListViewModel()

    ViewModel.GetQuestList();

    ko.applyBindings(ViewModel);

});