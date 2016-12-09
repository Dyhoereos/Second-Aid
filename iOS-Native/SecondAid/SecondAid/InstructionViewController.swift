//
//  InstructionViewController.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class InstructionViewController: UIViewController {
    
    @IBOutlet weak var nameLabel            : UILabel!
    @IBOutlet weak var descriptionLabel     : UILabel!
    @IBOutlet weak var videoWebView: UIWebView!
    
    let videoURL = "https://www.youtube.com/embed/EhO_MrRfftU"
    var procedure   : Procedure?
    var subProc     : SubProcedure?
    var procedureId : Int = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Instructions"
        
        procedureId = (procedure?.procedureId)!
        
        let urlRequest = URLRequest(url: URL(string: videoURL)!)
        loadYoutube(videoID: urlRequest)
        
        // Do any additional setup after loading the view.
        getInstructions()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func loadYoutube(videoID: URLRequest) {
        guard
            NSURL(string: "https://www.youtube.com/embed/\(videoID)") != nil
            else { return }
        videoWebView.loadRequest(videoID)
    }
    
    func getInstructions() {
        let procIdString : String = String(procedureId)
        let url = "http://secondaid.azurewebsites.net/api/subprocedures/" + procIdString
        print(url)
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/json"
        ]
        
        Alamofire.request(url, headers: headers).validate().responseJSON { response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                let name = json["name"].stringValue
                let description = json["description"].stringValue
                let subProcedureId = json["subProcedureId"].intValue
                let procedureId = json["procedureId"].intValue
                
                self.subProc = SubProcedure(name: name, description: description, subProcedureId: subProcedureId, procedureId: procedureId)
                self.nameLabel.text = name
                self.descriptionLabel.text = description
                
            case .failure(let error):
                print(error)
            }
        }
    }
}

struct SubProcedure {
    var name            : String
    var description     : String
    var procedureId     : Int
    var subProcedureId  : Int
    
    init(name: String, description: String, subProcedureId: Int, procedureId: Int) {
        self.name = name
        self.description = description
        self.procedureId = procedureId
        self.subProcedureId = subProcedureId
    }
    
}
