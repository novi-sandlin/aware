#!/bin/bash

echo -------------------------------
# update bills db
echo "Updating bills..."
updated=$(curl -s http://127.0.0.1:5000/api/congress/get_bills?update=True)
echo "Bills added:" $updated
echo -------------------------------
# update state-level congressmen db
# need for every state and branch, but jsut doing louisiana senate for now
no_more_reqs="Failed to get state congressmen: Request limit exceeded."
states=(
    "AL" "AK" "AZ" "AR" "CA" "CO" "CT" "DE" "FL" "GA" 
    "HI" "ID" "IL" "IN" "IA" "KS" "KY" "LA" "ME" "MD" 
    "MA" "MI" "MN" "MS" "MO" "MT" "NE" "NV" "NH" "NJ" 
    "NM" "NY" "NC" "ND" "OH" "OK" "OR" "PA" "RI" "SC" 
    "SD" "TN" "TX" "UT" "VT" "VA" "WA" "WV" "WI" "WY"
)
echo "Updating State Congressmen..."
updated=0
for state in ${states[@]}; do
    new_state_senate=$(curl -s http://127.0.0.1:5000/api/congress/state_members?update=True\&state=$state\&branch=Senate)
    new_state_house=$(curl -s http://127.0.0.1:5000/api/congress/state_members?update=True\&state=$state\&branch=House)
    if [[ $new_state_senate == $no_more_reqs ]] || [[ $new_state_house == $no_more_reqs ]]
    then
        echo $no_more_reqs
        break
    fi
    updated=$(($updated + $new_state_senate))
    updated=$(($updated + $new_state_house))
    # to avoid 10 requests per minutes cap
    sleep 65
done
echo "State Congressmen added:" $updated
echo -------------------------------
echo "Updating Fed. Congressmen"
updated=0
updated=$(($updated + $(curl -s http://127.0.0.1:5000/api/congress/members?branch=senate\&update=True)))
updated=$(($updated + $(curl -s http://localhost:5000/api/congress/members?branch=house\&update=True)))
echo "Fed. Congressmen added:" $updated
echo -------------------------------