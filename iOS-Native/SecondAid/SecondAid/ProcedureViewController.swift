//
//  ProcedureViewController.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-11-30.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import Foundation
import UIKit
import SwiftyJSON
import Alamofire

class ProcedureViewController: UIViewController {
    
    
    @IBOutlet weak var procedureName: UILabel!
    @IBOutlet weak var timeLabel: UILabel!
    @IBOutlet weak var questionnaireButton: UIButton!
    
    var procedure : Procedure?
    
    let hostUrl = "http://secondaid.azurewebsites.net/api/procedures/"
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.procedureName.text = procedure?.name
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        dateFormatter.timeZone = TimeZone(secondsFromGMT: 0)
        let date = dateFormatter.date(from: (procedure?.schedule?.time)!)
        
        dateFormatter.dateFormat = "MMMM dd yyyy"
        
        if(procedure?.schedule?.isCompleted)!{
            self.timeLabel.text = "Completed on \n"
            self.questionnaireButton.isHidden = false
        }else{
            self.timeLabel.text = "Scheduled for \n"
            self.questionnaireButton.isHidden = true
        }
        
        self.timeLabel.text = self.timeLabel.text! + dateFormatter.string(from: date!) + "\n"
        
        dateFormatter.dateFormat = "hh:mm a"
        self.timeLabel.text = self.timeLabel.text! + dateFormatter.string(from: date!)
    }
    
    @IBAction func showQuestionnaire(_ sender: Any) {
        self.performSegue(withIdentifier: "showQuestionnaire", sender: procedure)
    }
    
    @IBAction func showInstructions(_ sender: Any) {
        self.performSegue(withIdentifier: "showInstructions", sender: procedure)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let procedure = sender as? Procedure{
            if segue.identifier == "showInstructions" {
                let vc = segue.destination as! InstructionViewController
                vc.procedure = procedure
            } else if segue.identifier == "showQuestionnaire" {
                let vc = segue.destination as! QuestionnaireViewController
                vc.procedureId = (self.procedure?.procedureId)!
            }
        }
        
    }

}
