//
//  QuestionTableViewCell.swift
//  SecondAid
//
//  Created by Andrew Lukonin on 2016-12-06.
//  Copyright © 2016 Andrew Lukonin. All rights reserved.
//

import UIKit

class QuestionTableViewCell: UITableViewCell {
    
    
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var yesNoLabel: UILabel!
    @IBOutlet weak var yesNo: UISwitch!
    
    

    override func awakeFromNib() {
        super.awakeFromNib()
        //set to Yes due to initial position
        yesNoLabel.text = "No"
        yesNo.isOn = false
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    @IBAction func toggleSwitch(_ sender: Any) {
        let selection : Bool = yesNo.isOn
        if selection {
            yesNoLabel.text = "Yes"
        } else {
            yesNoLabel.text = "No"
        }
    }
}
