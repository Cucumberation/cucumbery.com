tmux new-session -d -s w
tmux send-keys -t w "cd /root/com.cucumbery" C-m
tmux send-keys -t w "npm run nodemon" C-m