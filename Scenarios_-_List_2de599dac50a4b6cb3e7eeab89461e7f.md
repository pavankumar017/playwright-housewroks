# Scenarios - List

- Closed
    
    [EHR-361](https://www.notion.so/EHR-361-c7b6942f16f049a0a5d82e4c2dd7244c?pvs=21)
    
    [EHR-523](https://www.notion.so/EHR-523-751153ad57e244e5b6089a894686d999?pvs=21)
    
    [Demographics - EHR-476, EHR -454, EHR-519](https://www.notion.so/Demographics-EHR-476-EHR-454-EHR-519-c3e1772570d7486a98ac3620901e9162?pvs=21)
    
    [EHR - 468](https://www.notion.so/EHR-468-bbe0f2470ffb443fbb6f0105e82799b9?pvs=21)
    
    [Calendar - EHR-490, EHR-496](https://www.notion.so/Calendar-EHR-490-EHR-496-0d58a0891e9846deb183094603c8e3d3?pvs=21)
    
    [Calendar - EHR-587, EHR-588, EHR-589](https://www.notion.so/Calendar-EHR-587-EHR-588-EHR-589-642717217ac34e9884e4bc7f3c854203?pvs=21)
    

[EMR Test Cases](Scenarios%20-%20List%202de599dac50a4b6cb3e7eeab89461e7f/EMR%20Test%20Cases%201248d365318d4f9eb415318a6ea96c24.csv)

[EMR/20/TC/](https://www.notion.so/0645121df1174b6a85066fc5738932a2?pvs=21)

- ~~587, 588, 589 in Tabular format - Review~~
    1. Verify that each of the 5 views are Invoked correctly for all the three entities
    2. "No data state" to be the default state when no preference is saved for all the three entities
    3. If a view is already saved, then check if the calendar is loaded with the saved view (TC-25)
    4. Verify that each of the 3 entities(PNR) are loaded correctly if they have saved preferences for each of the following views
        1. Provider - Single Mode - Month View Saved Preference
        2. Provider - Single Mode - Week View Saved Preference
        3. Provider - Single Mode - 3 Day View Saved Preference
        4. Provider - Single Mode - Day View Saved Preference
        5. Provider - Single Mode - Schedule View Saved Preference
        6. 6 to 10 : Provider - Multiple Mode - (Month, Week, 3 day, Single day, Schedule) Saved Preferences
        7. 11 to 20 : Repeat 1 to 10 for Nursing co-ordinators
        8. 21 to 30 : Repeat 1 to 10 for Resources
    
    1. Verify that the forward and backward arrows load correct data for all the saved preferences in point no. 4
    2. Validations for each of the following views in single-mode while creating an appointment for each of the 3 entities (PNR)
        
        1. Month
        2. Week
        3. 3 Day
        4. Day
        5. Schedule
        
    3. Validations of forward and backward arrows while creating the above appointments
    4. Check that the Today button is functional for all the views when data is displayed.
    5. Clicking on the `Today` and the values in the `view dropdown`  shouldn't display any data in the Calendar view when no data is selected
    6. Verify that the following entities support the relevant views only
        - Single Entity - Month, Week, 3 day, Single day, Schedule
        - Multiple Entity - Single day view only
    7. Validations for switching between the following view when the single mode is selected:
        1. Month → Week 
        2. Month → 3 Day
        3. Month → Day
        4. Month → Schedule
        5. Week → Month
        6. Week → 3 Day
        7. Week → Day
        8. Week → Schedule
        9. 3 Day → Month
        10. 3 Day → Week
        11. 3 Day → Schedule
        12. 3 Day → Day
        13. Day → Month
        14. Day → Week
        15. Day → Schedule
        16. Day →3 Day
        17. Schedule → Month
        18. Schedule → Week
        19. Schedule → 3 Day
        20. Schedule → Day
    8. Switching from Single-mode ( view: Month, Week, 3 day, Single day, Schedule) to Multiple-mode (view: Day)
        1. Single : Month → Multiple : Day
        2. Single : Week → Multiple : Day
        3. Single : 3 Day → Multiple : Day
        4. Single : Day → Multiple : Day
        5. Single : Schedule → Multiple : Day
    9. Switching from Multiple-mode (view: Day) to single-mode ( Day)
        1. Multiple : Day → Single : Day | following message will be displayed
            
            `In the "Single Resource Mode" you can only see details of a single resource. If you choose to continue, "Selected Resource Name" will only be displayed, but you can change it from the left bar. Do you wish to continue?
            [Yes]  [No]`
            
    10. Warning message `The "Selected View" only supports a single resource to be displayed. If you choose to continue we will show only appointments from the first resource currently selected i.e. "Selected Resource Name" do you wish to continue?` should be displayed while switching between the following views
        1. Multiple : Day → Multiple : Month, Week, 3 day, Schedule
        2. Single : Month → Multiple : Month, Week, 3 day, Schedule
        3. Single : Week → Multiple : Month, Week, 3 day, Schedule
        4. Single : 3 Day → Multiple : Month, Week, 3 day, Schedule
        5. Single : Day → Multiple : Month, Week, 3 day, Schedule
        6. Single : Schedule → Multiple : Month, Week, 3 day, Schedule
    11. UI for the following views
        
        1. Month
        2. Week
        3. 3 Day
        4. Day
        5. Schedule
        
    
- ~~Vitals~~
    1. Invoked from
    2. Until Patient info should be pinned at the top
    3. 2 scenarios for Date time
    4. TC-5: why only time and not date. (I remember we had discussed something for date during the walkthrough)
    5. TC for General?
    
    9. Where are we displaying Resting Metabolism Rate and BSI
    
    ![Scenarios%20-%20List%202de599dac50a4b6cb3e7eeab89461e7f/Untitled.png](Scenarios%20-%20List%202de599dac50a4b6cb3e7eeab89461e7f/Untitled.png)
    
    10. Where is the table of avg. BSAs used
    
    ![Scenarios%20-%20List%202de599dac50a4b6cb3e7eeab89461e7f/Untitled%201.png](Scenarios%20-%20List%202de599dac50a4b6cb3e7eeab89461e7f/Untitled%201.png)
    
    11. TC-13.1 : When the add button is clicked, the record gets added in the table below and the form is emptied.
    
    12. TC-27.1: `The displayed text has to be a single block of text, so that copying even without the button is easier.` Add a TC for a manual copy as well for both details & List view.
    
     13. Vitals Detail View: Add a TC for Data validation for all the sections as well
    
    14. I think this point is not valid now - EMR/407/TC/0020
    
- ~~Allergies~~
    1. on hover
        1. row hightlight or color change
        2. cursor change to hand cursor
    2. 
- Inpatient
    
    1) Drop down values needed to verify for ICD-10 and CPT codes
    
    2) Date of discharge should only allowed after the date of admission and date of service?
    
1. Any expanded state resets when the list view updates
2. Search resets
3. Any expanded state resets when the list view updates
4. Search resets
5. RR: Will the admission record be editable after entering the discharge date is added. If yes, TS can be added
6. RR: Record service is available even for "non active" admission - TC to be added
7. RG: Loader to be displayed when we expand the record
8. RG: Date of admission & discharge can not be in future - TC to be added
9. RG: Update the date of discharge - validate the data displayed is as expected
10. ~~RG: Verify "Created by" and "Last Updated by" - also to include - created at and modified at~~
11. RG: for non active record - record a service can be added - TC to be added
12. RG: Default sorting for admission - latest modified first? - TC to be added
13. RG: sort to be validated on date of service column
14. RG: Record a service for both consultation and procedure - validate data already filled is as expected
15. RG: validation for collapsable view of services
16. ~~RG: Edit and delete service - cancel or no option to be added~~
17. ~~RG: Edit service - validate data already filled is as expected~~
18. ~~RG: SRS validation for service and admission forms~~
19. ~~RG: user type with surgeon for surgeon, first_assistant for first assistant, anesthisia for Anesthisia should be displayed~~
20. 
- Cases
- Billed = No (False) (to show only unbilled)
- Billed = No (False) (to show only unbilled)
1. Assigned to
2. Filed in
3. completion status
4. Assigned to
5. Filed in
6. completion status
7. Answered
8. Unanswered
9. All