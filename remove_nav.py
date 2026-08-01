import os
import re

directory = "app/docs"

for root, dirs, files in os.walk(directory):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            with open(filepath, "r") as f:
                content = f.read()

            # Pattern to match the navigation block at the bottom
            # It usually starts with `<div className="mt-16...` or `<div className="flex flex-col sm:flex-row...` or `{/* Next/Prev Navigation */}`
            # up to the last `</div>` before the closing `</div>` of the page.
            
            # Since the file structure is generally:
            # return (
            #   <div className="... mx-auto ...">
            #     ...
            #     <div className="... mt-16 ..."> or <div className="flex flex-col sm:flex-row items-center justify-between ...">
            #        <Link ...>
            #     </div>
            #   </div>
            # )
            
            # Let's replace anything that looks like the pagination block with an empty string.
            # We can use regex to target the pagination div by looking for the one containing "Previous" or "Next" and being at the end of the return statement.
            
            pattern = re.compile(r'(?:{/\*\s*Next/Prev Navigation\s*\*/}\s*)?<div[^>]*border-t[^>]*>.*?</div>\s*</div>\s*\);\s*}\s*$', re.DOTALL)
            
            new_content = pattern.sub('</div>\n  );\n}', content)
            
            # Some pages might not have border-t, let's try another pattern if it doesn't match
            if content == new_content:
                pattern2 = re.compile(r'<div[^>]*>\s*<Link[^>]*>.*?Previous.*?</div>\s*</div>\s*\);\s*}\s*$', re.DOTALL)
                new_content = pattern2.sub('</div>\n  );\n}', new_content)
                
            if content == new_content:
                pattern3 = re.compile(r'<div className="(?:mt-16|flex flex-col sm:flex-row)[^>]*>.*?</div>\s*</div>\s*\);\s*}\s*$', re.DOTALL)
                new_content = pattern3.sub('</div>\n  );\n}', new_content)

            with open(filepath, "w") as f:
                f.write(new_content)
                
print("Done")
