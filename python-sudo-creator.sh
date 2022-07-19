#!/bin/bash


uss="brankhos"
sudoers_loc="/etc/sudoers.d/python"
declare -a StringArray=("3" "3.10")
 
 
 
 directory="$( pwd )"/venv/bin/python;
 will_add="$uss $HOSTNAME = (root) NOPASSWD: $directory"
 
 
 
 grep -qxF "$will_add" $sudoers_loc || echo "$will_add" >> $sudoers_loc
 
 
for val in ${StringArray[@]}; do
   grep -qxF "$will_add"$val $sudoers_loc || echo "$will_add"$val >> $sudoers_loc
done



rm -f ./python-sudo.sh
touch python-sudo.sh


echo "#!/bin/bash" >> ./python-sudo.sh
echo "" >> ./python-sudo.sh
echo "sudo $directory \"\$@\"" >> ./python-sudo.sh
sudo chmod +x ./python-sudo.sh
