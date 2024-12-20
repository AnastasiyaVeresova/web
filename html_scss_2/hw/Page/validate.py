import os
import subprocess

def validate_html_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                print(f"Validating {file_path}...")
                try:
                    result = subprocess.run(["tidy", "-q", "-e", file_path], capture_output=True, text=True, check=True)
                    print(f"{file_path} is valid.")
                except subprocess.CalledProcessError as e:
                    print(f"Errors found in {file_path}:")
                    print(e.stdout)
                except FileNotFoundError:
                    print("Error: 'tidy' command not found. Please install HTML Tidy.")
                    return

# Используйте текущую директорию
current_directory = os.path.dirname(os.path.abspath(__file__))
validate_html_files(current_directory)
