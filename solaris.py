import subprocess
import psutil
import sched, time
import requests
import json
from datetime import datetime

# Set the command to execute when process is offline.
commands = [["node", "index.js"]]

# Set up the scheduler.
s = sched.scheduler(time.time, time.sleep)

# URL to send the webhook request.
webhook_url = "https://maker.ifttt.com/trigger/notification/with/key/[key]"

# Notification message constants.
notif_title = 'Bot Operations'
notif_image = 'https://i.imgur.com/l8zEoba.png'

# Notifcation messages to send via webhook.
offline_data = { 
    'value1': notif_title,
    'value2': 'Solaris Bot went offline and will automatically reboot.',
    'value3': notif_image 
}

online_data = { 
    'value1': notif_title,
    'value2': 'Solaris Bot is still operational.',
    'value3': notif_image 
}

# Set the process check interval in seconds.
interval = 60
# Tracks time elapsed running script.
time_elapsed = 0
# How often in seconds to print console message of the process status.
check_interval = 600
# How often in seconds to send a notification to indicate the process is still operational.
notif_interval = 21600

#
# Run command when process is offline.
#
def main(sc):
    global time_elapsed
    # Check if the process is running.
    if (is_process_running("node index.js")):
        if (time_elapsed % check_interval == 0):
            print("[" + str(datetime.utcnow()) + "] Process is still running.")
        if (time_elapsed % notif_interval == 0):
            r = requests.post(webhook_url, data = json.dumps(online_data), headers = { 'Content-Type': 'application/json' })
    else:
        r = requests.post(webhook_url, data = json.dumps(offline_data), headers = { 'Content-Type': 'application/json' })
        print("[" + str(datetime.utcnow()) + "] Offline! Running process again.")
        subprocess.Popen(commands[0])
    # Call main function after a set interval.
    time_elapsed = time_elapsed + interval
    s.enter(interval, 1, main, (sc,))

#
# Check if process is still running.
#
def is_process_running(process_cmd):
    # Go through all processes in the system.
    for proc in psutil.process_iter():
        command = ""
        try:
            # Stringify each process' command line.
            for cmd in proc.cmdline():
                command += cmd + " "

            # Return true if the two commands match.
            if process_cmd == command.strip():
                return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return False

#
# Entry point of the program.
#
if __name__ == "__main__":
    # Start the automation process.
    print("Solaris Automation Ready!")
    s.enter(interval, 1, main, (s,))
    s.run()
