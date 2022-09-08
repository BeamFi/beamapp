#!/usr/bin/env bash

echo Setting Internet Identity Anchor ID to $INTERNET_IDENTITY_ANCHOR_ID
sed -i.bak 's/#INTERNET_IDENTITY_ANCHOR_ID#/'"$INTERNET_IDENTITY_ANCHOR_ID"'/g' './backend/config/Env.mo'

echo Setting Controller Principal ID to $CONTROLLER_PRINCIPAL_ID
sed -i.bak 's/#CONTROLLER_PRINCIPAL_ID#/'"$CONTROLLER_PRINCIPAL_ID"'/g' './backend/config/Env.mo'

echo Setting Client Key to $CLIENT_KEY
sed -i.bak 's/#CLIENT_KEY#/'"$CLIENT_KEY"'/g' './backend/config/Env.mo'

echo Setting CF Server Key to $CF_SERVER_KEY
sed -i.bak 's/#CF_SERVER_KEY#/'"$CF_SERVER_KEY"'/g' './backend/config/Env.mo'

echo Setting UI Web Domain to $UI_WEB_DOMAIN
sed -i.bak 's/#UI_WEB_DOMAIN#/'"$UI_WEB_DOMAIN"'/g' './backend/config/Env.mo'

echo Setting NFT PoJC Canister ID to $NFT_POJC_CANISTER_ID
sed -i.bak 's/#NFT_POJC_CANISTER_ID#/'"$NFT_POJC_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting NFT Pown Canister ID to $NFT_POWN_CANISTER_ID
sed -i.bak 's/#NFT_POWN_CANISTER_ID#/'"$NFT_POWN_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Canister Http Root Domain to $CANISTER_HTTP_ROOT_DOMAIN
sed -i.bak 's/#CANISTER_HTTP_ROOT_DOMAIN#/'"$CANISTER_HTTP_ROOT_DOMAIN"'/g' './backend/config/Env.mo'

echo Setting NFT File Bucket HTTP Protocol to $NFT_FILE_BUCKET_HTTP_PROTOCOL
sed -i.bak 's/#NFT_FILE_BUCKET_HTTP_PROTOCOL#/'"$NFT_FILE_BUCKET_HTTP_PROTOCOL"'/g' './backend/config/Env.mo'

echo Setting Job Canister ID to $JOB_CANISTER_ID
sed -i.bak 's/#JOB_CANISTER_ID#/'"$JOB_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Notification Canister ID to $NOTIFICATION_CANISTER_ID
sed -i.bak 's/#NOTIFICATION_CANISTER_ID#/'"$NOTIFICATION_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Notify Queue Canister ID to $NOTIFYQUEUE_CANISTER_ID
sed -i.bak 's/#NOTIFYQUEUE_CANISTER_ID#/'"$NOTIFYQUEUE_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting User Profile Canister ID to $USERPROFILE_CANISTER_ID
sed -i.bak 's/#USERPROFILE_CANISTER_ID#/'"$USERPROFILE_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Escrow Payment Canister ID to $ESCROW_PAYMENT_CANISTER_ID
sed -i.bak 's/#ESCROW_PAYMENT_CANISTER_ID#/'"$ESCROW_PAYMENT_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Beam Canister ID to $BEAM_CANISTER_ID
sed -i.bak 's/#BEAM_CANISTER_ID#/'"$BEAM_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Job Dispute Canister ID to $JOB_DISPUTE_CANISTER_ID
sed -i.bak 's/#JOB_DISPUTE_CANISTER_ID#/'"$JOB_DISPUTE_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Job DAO Canister ID to $JOB_DAO_CANISTER_ID
sed -i.bak 's/#JOB_DAO_CANISTER_ID#/'"$JOB_DAO_CANISTER_ID"'/g' './backend/config/Env.mo'

echo Setting Job Submission Canister ID to $JOB_SUBMISSION_CANISTER_ID
sed -i.bak 's/#JOB_SUBMISSION_CANISTER_ID#/'"$JOB_SUBMISSION_CANISTER_ID"'/g' './backend/config/Env.mo'

rm ./backend/config/Env.mo.bak