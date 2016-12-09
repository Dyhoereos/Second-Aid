//
//  QuestionnaireViewController.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class QuestionnaireViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    var procedureId : Int = 0
    var questionnaire : Questionnaire?
    var questionCount : Int = 0
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var questionNameLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.dataSource = self
        tableView.delegate = self
        
        getQuestionnaire()
        // Do any additional setup after loading the view.
    }
    
    func getQuestionnaire() {
        let procIdString : String = String(procedureId)
        let url = "http://secondaid.azurewebsites.net/api/questionnaires/" + procIdString
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        Alamofire.request(url, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                print("_______________IN QUESTIONNAIRE______________")
                print(json)
                
                let qName = json["name"].stringValue
                let qId = json["questionnaireId"].intValue
                self.questionnaire = Questionnaire(questionnaireId: qId, name: qName)
                for question in json["questions"].arrayValue {
                    let qId = question["questionId"].intValue
                    let qBody = question["questionBody"].stringValue
                    self.questionnaire?.questions.append(Question(questionId: qId,
                                 questionBody: qBody))
                    self.questionCount += 1
                }
                self.questionNameLabel.text = self.questionnaire?.name
                self.tableView.reloadData()
                
            case .failure(let error):
                print(error)
            }
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let question = questionnaire?.questions[indexPath.row]
        
        // Instantiate a cell
        let cellIdentifier = "QuestionCell"
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! QuestionTableViewCell
        
         cell.questionLabel.text = question?.questionBody
        
        // Returning the cell
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        return questionCount
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

struct Questionnaire {
    var questionnaireId : Int
    var name : String
    var questions : [Question] = []
    
    init (questionnaireId : Int, name : String) {
        self.questionnaireId = questionnaireId
        self.name = name
    }
}

struct Question {
    var questionId : Int
    var questionBody : String
    
    init (questionId : Int, questionBody: String) {
        self.questionId = questionId
        self.questionBody = questionBody
    }
}
